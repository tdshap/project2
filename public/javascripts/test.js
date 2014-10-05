var ContactsModel = Backbone.Model.extend({
	urlRoot: "/contacts"
})

var CategoriesModel = Backbone.Model.extend({
	urlRoot: "/categories"
})
// ##########################################################
// 3 collections with instantiations


// Family
var FamilyCollection = Backbone.Collection.extend({
	url: "/contacts",
	model: ContactsModel, 
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


var FamilyView = Backbone.View.extend({
	tagName: "tr",
	template: _.template($("#family-list-template").html()),
	events: {
	    "click button.edit" : "update",
	},

	initilize: function(){
		this.listenTo(editView, "destroy", this.destroy)

	},
  destroy: function(event) {
    console.log("i can listen!")
    // this.model.destroy();
  },

  update: function(event) {
  	console.log("updated pushed")
  	console.log(this)
  	console.log(event)
    // this.model.set('number', this.$el.find('input[name="quantity"]').val());
    // this.model.save();
  },

	render: function() {
		this.$el.html(this.template(this.model.attributes));
	}, 
})

// family LIST VIEW
var FamilylistView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.addOne);
		familyCollection.fetch();
	},
		addOne: function(a){
		var familyView = new FamilyView ({ model : a });
		if (a.get("category_id") == 8){
			familyView.render();
			$("tbody.family").append(familyView.el);
		
		}
	}
})
var familylistView = new FamilylistView ({ 
	collection: familyCollection,
	el: "tbody.family"
})

var editfamilyView = new FamilyView ({
	el: $("div.edit")
})


var WorkView = Backbone.View.extend({
	tagName: "tr",
	template: _.template($("#work-list-template").html()),
	render: function() {
		this.$el.html(this.template(this.model.attributes));
	}, 
})

// work LIST VIEW
var WorklistView = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.collection, "add", this.addOne);
		workCollection.fetch();
	},
		addOne: function(contact){
		var workView = new WorkView ({ model : contact });
		if (contact.get("category_id") == 9){
			workView.render();
			$("tbody.work").append(workView.el);
		}
	}
})
var worklistView = new WorklistView ({ 
	collection: workCollection,
	el: "tbody.work" 
})


var FriendsView = Backbone.View.extend({
	tagName: "tr",
	template: _.template($("#friends-list-template").html() ),
	
	render: function() {
		this.$el.html(this.template(this.model.attributes));
	}, 
})

// friends LIST VIEW 
var FriendslistView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.addOne);
		friendsCollection.fetch();
	},
		addOne: function(a){
		var friendsView = new FriendsView ({ model : a });
		if (a.get("category_id") == 7){
			friendsView.render();
			$("tbody.friends").append(friendsView.el);
		}
	}
})

var friendslistView = new FriendslistView ({ 
	collection: friendsCollection, 
	el: "tbody.friends" 
})


var FormView = Backbone.View.extend({
	events: {
		"click button#add" : "createSomething"
	},

	createSomething: function(){
		console.log(this)
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



var formView = new FormView({ 
	el: $("div.add") 
})

var Router = Backbone.Router.extend({
	routes: {
		"": "home",
	}
})
var router = new Router;
router.on("route:home", function(){
	
})


Backbone.history.start();







