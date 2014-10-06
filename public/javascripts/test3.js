 var ContactsModel = Backbone.Model.extend({
 	urlRoot: "/contacts",
 })

 var CategoriesModel = Backbone.Model.extend({
 	urlRoot: "/categories"
 })


var FamilyCollection1 = Backbone.Collection.extend({
	url: "/contacts",
	model: ContactsModel, 

})
var familyCollection1 = new FamilyCollection1();


var FamilyCollection2 = Backbone.Collection.extend({
	url: "/categories/8",
	model: ContactsModel, 

})
var familyCollection2 = new FamilyCollection2();


familyCollection2.fetch({
	success: function(event){
		console.log(event.models[0].attributes.contacts[0])
		for (var i=0; i<event.models[0].length; i++){
			event.models
		}
	}
})




