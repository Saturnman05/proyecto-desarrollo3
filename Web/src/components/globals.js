export class User {
  constructor (userName, fullName, password) {
    this.userName = userName
    this.fullName = fullName
    this.password = password
  }

  get FullName () {
    return this.fullName
  }
}
