/* eslint-disable linebreak-style */
/**
 * General cruds class
 */
 const { ObjectId } = require('mongoose').Types;

 class Cruds {
   constructor(Model, Schema = {}) {
     this.Model = Model;
     this.keys = Object.keys(Schema);
   }
 
   async create(params, returnOnlyId = false) {
     const newObj = new this.Model({ ...params });
     if (!returnOnlyId) {
       return newObj.save();
     }
 
     const result = await newObj.save();
     return { _id: result.id };
   }
 
   async createBulk(paramsArr) {
     const modelObj = [];
     paramsArr.forEach((element) => {
       const elementCopy = { ...element };
       modelObj.push(new this.Model(elementCopy));
     });
     return this.Model.insertMany(modelObj);
   }
 
   async find(params = {}, projection = {}, options = {}) {
     return this.Model.find(params, projection, { sort: { createdAt: -1 }, ...options });
   }
 
   async count(params = {}) {
     return this.Model.find(params).count();
   }
 
   async findOne(params = {}, projection = {}, options) {
     return this.Model.findOne(params, projection, options);
   }
 
   async findById(id, projection) {
     if (projection) return this.Model.findById(id, projection);
     return this.Model.findById(id);
   }
 
   async deleteById(id) {
     return this.Model.deleteOne({ _id: ObjectId(id) });
   }
   async findOneAndDelete(filter) {
     if (filter._id)
       filter._id = ObjectId(filter._id);
     return this.Model.findOneAndDelete(filter);
   }
 
   async updateById(id, params = {}) {
     return this.Model.findOneAndUpdate({ _id: ObjectId(id) }, { $set: params }, { new: true });
   }

   async updateByParam(param, params = {}, pushParams = {}) {
    return this.Model.findOneAndUpdate(param, {
      $set: params,
      $push: pushParams,
    }, { new: true, upsert: true });
  }
 
   async bulkUpdate(query, params = {}) {
     return this.Model.updateMany(query, { $set: params }, { new: true });
   }
 
   async deleteKeys(query, params) {
     return this.Model.updateMany(query, { $unset: params });
   }
 
   async update(query, params = {}, option) {
     //if (option) {
       return this. Model.update(query, { $set: params }, { ...option });
   //  }
    // return this.Model.findOneAndUpdate(query, { $set: params }, { new: true });
   }
 
   async updateMany(query, params) {
     return this.Model.updateMany(query, { $set: params });
   }
 
   async findWithPagination(params = {}, options = {}) {
     const limit = options.limit || process.env.PAGINATION_LIMIT || 10;
     return this.Model.paginate(
       params,
       {
         limit,
         sort: options.sort || { createdAt: -1 },
         ...options,
       },
     );
   }
 
   async findOneWithPopulate(params, populateObj) {
     return this.Model.findOne({ _id: params.id }).populate(populateObj);
   }
 
   async findOneWithPopulateQuery(query, populateObj) {
     return this.Model.find(query).populate(populateObj);
   }
 
   async aggregate(pipeline = []) {
     return this.Model.aggregate(pipeline);
   }
 }
 
 module.exports = Cruds;
 