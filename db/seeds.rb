# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Role.create!(name: 'admin') if Role.where(:name => 'admin').blank?
Role.create!(name: 'user') if Role.where(:name => 'user').blank?
role = Role.where(:name => 'admin').first

if role.present? &&  User.where(:email => 'admin@gmail.com').blank?
  role.users.create!(email: "admin@gmail.com", username: "admin", password: "12345678")
end
