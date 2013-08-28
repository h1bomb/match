/**
 * FavorController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */
var fs = require('fs');
var path = require('path');
module.exports = {
  uploadgirl:function(req,res)
  {
     // 获得文件的临时路径
     var tmp_path = req.files.attachments.path;
     if(req.files.attachments.type.indexOf('image/')<0)
     {
        return res.json({'error':'wrong format!'});
     }
     // 指定文件上传后的目录 - 示例为"images"目录。
     var name = new Date().getTime()+path.extname(req.files.attachments.name);
     var target_path = sails.config.appPath+'\\assets\\img\\'+name;
     
     // 移动文件
     fs.rename(tmp_path, target_path, function(err) 
     {
        if (err) throw err;
        // 删除临时文件夹文件, 
        fs.unlink(tmp_path, function() 
        {
            if (err) throw err;
            params = {img:'img/'+name,vote:0}
            Favor.create(params, function(err, model) 
            {
			  if (err) return next(err);

              //不知道为什么要等3s，前端才可以获取到图片
              setTimeout(function()
              {
                return res.json(model.toJSON());
              },3000);
		    });
        });
    } );
  }

};
