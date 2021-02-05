import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken() {
	return Cookies.set(TokenKey, true, { expires: 3 })
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}
