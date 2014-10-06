var ContactsModel = Backbone.Model.extend({
	urlRoot: "/contacts",

	validate: function(attributes,options) {
	  
	  if (attributes.name.length <= 0){
	  	alert("something is wrong!")
	  	// return("please enter name")
	  }
	  else if (attributes.age.length <= 0 || attributes.age < 0 ){
	  	alert("please enter age")
	  }
	  else if (attributes.address.length <= 0){
	  	alert("please enter address")
	  }
	  else if (attributes.phone_number.length <= 7){
	  	alert("please enter phone number")
	  }
	  else if (attributes.picture <= 0){
	  	alert("please enter picture url")
	  }
	}
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

var ModalView = Backbone.View.extend({
	template: _.template($("#edit-modal-template").html() ),
	events: {
		"click button.edit": "edit",
		"click button.delete": "deleteThing"
	},

	initialize: function(){
		this.render()
	},
	render: function(){
		this.$el.html(this.template(this.model.attributes))
		$("div#modalView").html(this.$el)
	},
	deleteThing: function(event){
		console.log("button deleted pushed")
		this.model.destroy();
		that.remove()

	},
	edit: function(){
		name = this.$el.find('input[name="name"]').val();
		age = this.$el.find('input[name="age"]').val();
		address = this.$el.find('input[name="address"]').val();
		phone_number = this.$el.find('input[name="phone_number"]').val();
		picture = this.$el.find('input[name="picture"]').val();
		category_id = this.$el.find('select>option:selected').val();

		this.model.set({
			name: name, 
			age: age, 
			address: address, 
			phone_number: phone_number, 
			picture: picture, 
			category_id: category_id
		})
		this.model.save()
		that.render()
	}

})


var FamilyView = Backbone.View.extend({
	tagName: "tr",
	template: _.template($("#family-list-template").html()),
	events: {
	    "click button.editfamily": "passModal",
	},
	passModal: function(event){
		that = this,
		modalView = new ModalView({ model: this.model })
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


var WorkView = Backbone.View.extend({
	tagName: "tr",
	template: _.template($("#work-list-template").html()),
	events: {
	   "click button.editwork": "passModal",
	},
	passModal: function(event){
		that = this,
		modalView = new ModalView({ model: this.model })
	},

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
	events: {
    "click button.editfriends": "passModal",
	},
	passModal: function(event){
		that = this,
		modalView = new ModalView({ model: this.model })
	},

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
		var name = this.$el.find('input[name="name"]').val();
		var age = this.$el.find('input[name="age"]').val();
		var address = this.$el.find('input[name="address"]').val();
		var phone_number = this.$el.find('input[name="phone_number"]').val();
		var picture = this.$el.find('input[name="picture"]').val();
		var group = this.$el.find('select>option:selected').val();

		if (group == 8 ){
			console.log("group 8")
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
	el: $("div#addform") 
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







