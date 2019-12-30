# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

lvCount = 1;
baseExp = 10;

10.times {
	Level.create(level: lvCount, exp: lvCount * baseExp)
	lvCount += 1
}

Character.create(name: "Imade", level: 1, exp: 0)
Character.create(name: "FanZhong", level: 1, exp: 0)
Character.create(name: "Dom", level: 1, exp: 0)