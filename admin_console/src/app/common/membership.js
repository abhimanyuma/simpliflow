export function user_level_to_number(membership_string) {
  switch (membership_string) {
    case "owner":
      return 100
    case "admin":
      return 10
    case "regular":
      return 1
  }
}

export function can_edit(prospecitve_editor, member) {
  let ed_level = user_level_to_number(prospecitve_editor)
  let mem_level = user_level_to_number(member)

  if (ed_level >= mem_level) {
    return true
  } else {
    return false
  }
}

export function can_make_admin(prospecitve_editor, member) {
  return (can_edit(prospecitve_editor, member) && can_edit(prospecitve_editor, "admin"))
}

export function can_make_member(prospecitve_editor, member) {
  return (can_edit(prospecitve_editor, member))
}

export function can_make_owner(prospecitve_editor, member) {
  return (can_edit(prospecitve_editor, "owner"))
}
