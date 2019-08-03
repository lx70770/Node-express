const { exec } = require("../db/mysql");

const getList = (author, keyword) => {
  let sql = "select * from blogs where 1=1 ";
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += "order by createtime desc;";
  return exec(sql);
};

// 查询详情
const getDetail = id => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  });
};

// 新建blog
const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData;
  const createtime = Date.now();
  const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}' , ${createtime}, '${author}');
    `;
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    };
  });
};

// 更新  blog
const updateBlog = (id, blogData = {}) => {
  // blogData 是一个博客对象  包含title content属性
  const { title, content } = blogData;
  const sql = `
        update blogs set title='${title}', content='${content}' where id='${id}' 
    `;
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
};
// 删除blog
const deleteBlog = (id, author) => {
  const sql = `delete from blogs where id='${id}' and author='${author}';`;
  return exec(sql).then(deleteData => {
    return deleteData.affectedRows > 0;
  });
};

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
};
