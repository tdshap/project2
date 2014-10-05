var ContactsModel = Backbone.Model.extend({
	urlRoot: "/contacts"
})
// ##########################################################
// 3 collections with instantiations


// Family
var FamilyCollection = Backbone.Collection.extend({
	url: "/contacts",
	model: ContactsModel
})
var familyCollection = new FamilyCollection();

// Work
var WorkCollection = Backbone.Collection.extend({
	url: "/contacts",
	model: ContactsModel
})
var workCollection = new WorkCollection();

// Friends
var FriendsCollection = Backbone.Collection.extend({
	url: "/contacts",
	model: ContactsModel
})
var friendsCollection = new FriendsCollection();

// ##########################################################
// 3 views with instantiations

// family LIST VIEW
var FamilylistView = Backbone.View.extend({
	
	el: "ul.family",
	initialize: function() {
		this.listenTo(this.collection, "add", this.addOne);
		familyCollection.fetch();
	},
		addOne: function(a){
		var familyView = new FamilyView ({ model : a });
		if (a.get("category_id") == 8){
			familyView.render();
			this.$el.append(familyView.el)
		}
	}
})
var familylistView = new FamilylistView ({ collection: familyCollection})


var FamilyView = Backbone.View.extend({
	tagName: "li",

	render: function() {
		this.$el.html(this.model.get("name") + this.model.get("age") + this.model.get("address") + this.model.get("phone_number") + this.model.get("picture"));
	}, 
})

// work LIST VIEW
var WorklistView = Backbone.View.extend({
	el: "ul.work",
	initialize: function() {
		this.listenTo(this.collection, "add", this.addOne);
		workCollection.fetch();
	},
		addOne: function(a){
		var workView = new WorkView ({ model : a });
		if (a.get("category_id") == 9){
			workView.render();
			console.log(workView.el)
			this.$el.append(workView.el)
		}
	}
})
var worklistView = new WorklistView ({ collection: workCollection })

var WorkView = Backbone.View.extend({
	tagName: "li",

	render: function() {
		this.$el.html(this.model.get("name") + this.model.get("age") + this.model.get("address") + this.model.get("phone_number") + this.model.get("picture"));
	}, 
})

// friends LIST VIEW 
var FriendslistView = Backbone.View.extend({
	
	// el: "ul.friends",
	initialize: function() {
		this.listenTo(this.collection, "add", this.addOne);
		friendsCollection.fetch();
	},
		addOne: function(a){
		var friendsView = new FriendsView ({ model : a });
		if (a.get("category_id") == 7){
			friendsView.render();
			this.$el.append(friendsView.el)
		}
	}
})

var friendslistView = new FriendslistView ({ collection: friendsCollection })

var FriendsView = Backbone.View.extend({
	// tagName: "li",
	el: "ul.friends",
	render: function() {
		this.$el.html(this.model.get("name") + this.model.get("age") + this.model.get("address") + this.model.get("phone_number") + this.model.get("picture"));
		// var template = _.template($("#friends-list-template").html());
		// this.$el.html(template({contacts:friendsCollection.models}));
	}, 
})



var FormView = Backbone.View.extend({
	events: {
		"click button.add" : "createSomething"
	},

	createSomething: function(){
		var name = this.$el.find('input[name="name"]').val();
		var age = this.$el.find('input[name="age"]').val();
		var address = this.$el.find('input[name="address"]').val();
		var phone_number = this.$el.find('input[name="phone_number"]').val();
		var picture = this.$el.find('input[name="picture"]').val();
		var group = this.$el.find('select>option:selected').val();

		if (group == 8 ){
			familyCollection.create({
				name: name, 
				age: age, 
				address: address, 
				phone_number: phone_number, 
				picture: picture, 
				category_id: group
			})
		} else if (group == 7 ){
			friendsCollection.create({
				name: name, 
				age: age, 
				address: address, 
				phone_number: phone_number, 
				picture: picture, 
				category_id: group
			})
		} else if (group == 9 ){
			workCollection.create({
				name: name, 
				age: age, 
				address: address, 
				phone_number: phone_number, 
				picture: picture, 
				category_id: group
			})
		}
	}
})

var formView = new FormView({ el: $(".form") })


var Router = Backbone.Router.extend({
	routes: {
		"": "home",
	}
})
var router = new Router;
router.on("route:home", function(){

	console.log("you have reached the home page")
})

Backbone.history.start();







