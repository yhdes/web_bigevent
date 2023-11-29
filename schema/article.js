// 导入定义验证规则的模块
const joi = require('joi')

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

// const cover_img = joi.binary().required()
const cover_img = joi.binary()

// 这段代码定义了`cover_img`的校验规则，要求其必须是一个字符串，并且是必填的。
// 定义pagenum和pagesize的校验规则
const pagenum = joi.number().integer().min(1).required();
// const pagenum = joi.number().integer().min(1);

const pagesize = joi.number().integer().min(1).required();
// const pagesize = joi.number().integer().min(1);


// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
}

//校验规则对象，获取文章的列表数据
exports.get_article_schema={
  params:{
    pagesize,
    pagenum,
   
    // cate_id,
    // state,
  },
}


// 校验规则对象 - 删除分文章
exports.delete_article_schema = {
  params: {
    id,
  },
}


//校验规则对象 - 根据 Id 获取详情
exports.get_articlebyid_schema = {
  params: {
    id,
  },
}

//更新文章信息
exports.update_article_schema = {
  body: {
    Id: id,
    title,
    cate_id,
    content,
    cover_img,
    state,
  },
}


