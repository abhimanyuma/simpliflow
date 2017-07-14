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

export class Team {

  static default_root(organisation_slug) {
    return (`/dashboard/organisations/${organisation_slug}/teams`)
  }

  static create(organisation_slug) {
    return (`/dashboard/organisations/${organisation_slug}/teams/new`)
  }

  static delete(organisation_slug, team_slug) {
    return (`/dashboard/organisations/${organisation_slug}/teams/${team_slug}/delete`)
  }

  static show(organisation_slug, team_slug) {
    return (`/dashboard/organisations/${organisation_slug}/teams/${team_slug}`)
  }

  static edit(organisation_slug, team_slug) {
    return (`/dashboard/organisations/${organisation_slug}/teams/${team_slug}/edit`)
  }


}

export class Role {

  static default_root(organisation_slug) {
    return (`/dashboard/organisations/${organisation_slug}/roles`)
  }

  static create(organisation_slug) {
    return (`/dashboard/organisations/${organisation_slug}/roles/new`)
  }

  static delete(organisation_slug, role_slug) {
    return (`/dashboard/organisations/${organisation_slug}/roles/${role_slug}/delete`)
  }

  static show(organisation_slug, role_slug) {
    return (`/dashboard/organisations/${organisation_slug}/roles/${role_slug}`)
  }

  static edit(organisation_slug, role_slug) {
    return (`/dashboard/organisations/${organisation_slug}/roles/${role_slug}/edit`)
  }


}
