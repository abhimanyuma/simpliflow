// @flow

export class Profile {

  static default_root() {
    return "/dashboard/profile"
  }

  static change(field) {
    return (Profile.default_root() + `#change_${field}`)
  }

  static edit_username() {
    return Profile.change("username")
  }

  static edit_email() {
    return Profile.change("email")
  }

  static edit_password() {
    return Profile.change("password")
  }

  static edit_auth_token() {
    return (Profile.default_root() + "#refresh_auth_token")
  }
}

export class Organisation {

  static default_root() {
    return ("/dashboard/organisations")
  }

  static new_org() {
    return (Organisation.default_root() + "/new")
  }

  static show(org_slug) {
    return (Organisation.default_root() + `/${org_slug}`)
  }

  static edit(org_slug) {
    return (Organisation.default_root() + `/${org_slug}/edit`)
  }

  static delete(org_slug) {
    return (Organisation.default_root() + `/${org_slug}/delete`)
  }

}
