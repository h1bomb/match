'use strict';

/* Controllers */
var ret = '';

//配对主程序
function MatchCtrl($scope, Match,$timeout) 
{
  var all = [];
  
  //获取数据
  Match.query(function(data)
  {

	  var num1 = Math.floor(data.length*Math.random());
	  var num0 = num1==data.length-1?num1-1:num1+1;

    data[num1].show = false;
    data[num0].show = false;

	  $scope.pics = [data[num1],data[num0]];

      for(var i=0;i<$scope.pics.length;i++)
      {
      	delOne(data,$scope.pics[i].id);
      }

      all = data;
  });
  
  //删除出现过的
  function delOne(arr,id)
  {
    for(var i=0;i<arr.length;i++)
    {
    	if(arr[i].id==id)
        {
        	arr.splice(i,1);
        }
    }
  }

  //喜欢操作
  $scope.like = function(id)
  {
     
     for(var i=0;i<2;i++)
     {
       delOne(all,$scope.pics[i].id);
       $scope.pics[i].show = true;
     }

     if($scope.pics[0].id==id)
     {
        procData(0,1);
     }
     else
     {
        procData(1,0);
     }

     function procData(num1,num2)
     {
        $timeout(function()
        {
          if(all.length==0)
          {
            window.location.href = "#/ret/"+($scope.pics[num1].id);
          }
          else
          {
            $scope.pics[num2] = all[Math.floor(all.length*Math.random())];
            $scope.pics[num2].show = false;
          }
        },1000);
        $scope.pics[num1].vote = Number($scope.pics[num1].vote)+1;
        $scope.pics[num1].$save();
     }
  }   

  //上传图片
  $('#fileupload').fileupload(
  {
      url: '/favor/uploadgirl',
      dataType: 'json',
      done: function (e, data) 
      {
          if(data.result.error)
          {
             alert(data.result.error);
          }
          else
          {
             var rec = new Match(data.result);
             all.push(rec);
             var num = Math.round(2*Math.random());
             if(num==2)
             {
              num = 0;
             }
             if(!$scope.pics)
             {
              $scope.pics = [];
             }
             $scope.$apply(function()
             {
                $scope.pics[num] = rec;
             });
          }
      },
      progressall: function (e, data) 
      {
          var progress = parseInt(data.loaded / data.total * 100, 10);
          if(console)
          {
             console.log(progress);
          }
      }
  }).prop('disabled', !$.support.fileInput);
}

//图片详情页
function PicCtrl($scope,$routeParams,Match) 
{
  $scope.pic = Match.get({id:$routeParams.id});
}

//产生结果
function RetCtrl($scope,$routeParams,Match)
{
    $scope.pic = Match.get({id:$routeParams.id});
    $scope.error = false;
    $scope.pics = Match.query({limit:10,sort:"vote|desc"});
    if(!$scope.pic)
    {
      $scope.error = 'No results!';
    }
    
}

