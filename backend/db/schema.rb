# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170716132059) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "forms", force: :cascade do |t|
    t.string   "title"
    t.string   "sub_title"
    t.text     "content"
    t.integer  "organisation_id"
    t.string   "uuid"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["organisation_id"], name: "index_forms_on_organisation_id", using: :btree
  end

  create_table "organisations", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "slug",       null: false
    t.text     "bio"
    t.string   "tagline"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_organisations_on_slug", unique: true, using: :btree
  end

  create_table "permissions", force: :cascade do |t|
    t.integer  "actor_id"
    t.string   "actor_type"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.integer  "level",         default: 0
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.boolean  "full_member",   default: true
    t.index ["actor_type", "actor_id"], name: "index_permissions_on_actor_type_and_actor_id", using: :btree
    t.index ["resource_type", "resource_id", "level"], name: "index_permissions_on_resource_type_and_resource_id_and_level", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_permissions_on_resource_type_and_resource_id", using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.string   "slug"
    t.string   "bio"
    t.integer  "organisation_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["name"], name: "index_roles_on_name", using: :btree
    t.index ["organisation_id"], name: "index_roles_on_organisation_id", using: :btree
    t.index ["slug"], name: "index_roles_on_slug", unique: true, using: :btree
  end

  create_table "teams", force: :cascade do |t|
    t.string   "name"
    t.string   "slug"
    t.string   "bio"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "organisation_id"
    t.index ["name"], name: "index_teams_on_name", using: :btree
    t.index ["organisation_id"], name: "index_teams_on_organisation_id", using: :btree
    t.index ["slug"], name: "index_teams_on_slug", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "auth_token",             default: ""
    t.string   "name"
    t.string   "username"
    t.integer  "role",                   default: 0
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
