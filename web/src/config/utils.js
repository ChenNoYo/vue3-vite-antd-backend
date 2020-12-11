/**
 * 存储localStorage
 * @param name
 * @param content
 */
export const hdStorage = (name, content) => {
  if (!name) return
  if (content) {
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    return window.localStorage.setItem(name, content)
  }
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 * @param name
 */
export const rmStorage = (name) => {
  if (!name) return
  window.localStorage.removeItem(name)
}
/**
 * 时间格式化
 * @param date
 * @param fmt
 * @returns {*}
 */
export const formatDate = (date, fmt) => {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}

export const getWeek = (date) => {
  let weekStr
  switch (date.getDay()) {
    case 0:
      weekStr = '日'
      break
    case 1:
      weekStr = '一'
      break
    case 2:
      weekStr = '二'
      break
    case 3:
      weekStr = '三'
      break
    case 4:
      weekStr = '四'
      break
    case 5:
      weekStr = '五'
      break
    case 6:
      weekStr = '六'
      break
  }
  return weekStr
}

/**
 * 数据JSON.parse转换
 */
export const getJson = (data) => {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 定义导出Excel模板
 * @type {string}
 */
let uri = 'data:application/vnd.ms-excel;base64,'
let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"  
                  xmlns:x="urn:schemas-microsoft-com:office:excel"
                  xmlns="http://www.w3.org/TR/REC-html40">
                  <head>
                    <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">
                    <!--[if gte mso 9]>
                    <xml>
                      <x:ExcelWorkbook>
                        <x:ExcelWorksheets>
                          <x:ExcelWorksheet>
                            <x:Name>sheet1</x:Name>
                            <x:WorksheetOptions>
                              <x:DisplayGridlines/>
                            </x:WorksheetOptions>
                          </x:ExcelWorksheet>
                        </x:ExcelWorksheets>
                      </x:ExcelWorkbook>
                    </xml>
                    <![endif]-->
                    <style>
                      th{
                        color:#333 !important;
                        font-size:18px !important;
                        text-align:center !important;
                      }
                      td{
                        color:#555 !important;
                        font-size:14px !important;
                        text-align:center !important;
                      }
                    </style>
                  </head>
                  <body>
                  <table>
                    {thead}
                    {tbody}
                  </table>
                  </body>
                  </html>`
let base64 = function (s) {
  return window.btoa(unescape(encodeURIComponent(s)))
}
let format = function (s, c) {
  return s.replace(/{(\w+)}/g,
    function (m, p) {
      return c[p]
    })
}
/**
 * 页面获取theadHTML,tbodyHTML代码进行导出
 */
export const elementExcel = (theadHTML, tbodyHTML, name) => {
  // 共用a链接下载
  var ctx = {
    worksheet: name,
    thead: theadHTML,
    tbody: tbodyHTML
  }
  let _self = document.getElementById('a-download')
  _self.href = uri + base64(format(template, ctx))
  _self.download = name
  _self.click()
}
/**
 * elementUI  表格 合并方法
 * @param row  当前行
 * @param column 当前列
 * @param rowIndex 当前行号
 * @param cellMerges 合并规则
 * @returns {*}
 */
/**
 * 表格下载
 */
export const exportTable = (data, name = '导出表格') => {
  var str = decodeURI(data.split('?')[1])
  const downName = str !== 'undefined' ? str.split('=')[1] : name
  const src = `http://${window.location.host}/${data}`
  console.log('src', src)
  let _self = document.getElementById('a-download')
  _self.href = src
  _self.download = downName + '_' + formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')
  _self.click()
}
/**
 * 拼接请求str
 */
export const getParamStr = (params) => {
  return Object.keys(params).map(item => `${item}=${params[item]}`).join('&')
}

export const compress = (file) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const image = new Image()
      image.src = e.target.result
      image.onload = function () {
        const that = this
        // 默认按比例压缩
        let w = that.width
        let h = that.height
        const scale = w / h
        w = file.width || w
        h = file.height || (w / scale)
        let quality = 0.8 // 默认图片质量为0.7
        // 生成canvas
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        // 创建属性节点
        const anw = document.createAttribute('width')
        anw.nodeValue = w
        const anh = document.createAttribute('height')
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(that, 0, 0, w, h)
        // 图像质量
        if (file.quality && file.quality <= 1 && file.quality > 0) {
          quality = file.quality
        }
        // quality值越小，所绘制出的图像越模糊
        const data = canvas.toDataURL('image/jpeg', quality)
        const newFile = convertBase64UrlToBlob(data)
        // 压缩完成执行回调
        resolve(newFile)
      }
    };
    fileReader.readAsDataURL(file);
  })
}

function convertBase64UrlToBlob (urlData) {
  const bytes = window.atob(urlData.split(',')[1]) // 去掉url的头，并转换为byte
  // 处理异常,将ascii码小于0的转换为大于0
  const ab = new ArrayBuffer(bytes.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i)
  }
  return new Blob([ab], {
    type: 'image/png'
  })
}