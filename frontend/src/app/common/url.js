// @flow

export class Profile {

  static default_root() {
    return "/dashboard/profile"
  }

  static change(field) {
    return (this.default_root() + `#change_${field}`)
  }

  static edit_username() {
    return this.change("username")
  }

  static edit_email() {
    return this.change("email")
  }

  static edit_password() {
    return this.change("password")
  }

  static edit_auth_token() {
    return (this.default_root() + "#refresh_auth_token")
  }
}

export class Organisation {

  static default_root() {
    return ("/dashboard/organisations")
  }

  static new_org() {
    return (this.default_root() + "/new")
  }

  static show(org_slug) {
    return (this.default_root() + `/${org_slug}`)
  }

  static edit(org_slug) {
    return (this.default_root() + `/${org_slug}/edit`)
  }

}
