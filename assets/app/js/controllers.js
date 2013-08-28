'use strict';

/* Controllers */
var ret = '';

//配对主程序
function MatchCtrl($scope, Match) 
{
  var all = [];

  //获取数据
  Match.query(function(data)
  {

	  var num1 = Math.floor(data.length*Math.random());
	  var num0 = num1==data.length-1?num1-1:num1+1;
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
     delOne(all,$scope.pics[0].id);
     delOne(all,$scope.pics[1].id);

     for(var i=0;i<2;i++)
     {
         if($scope.pics[i].id!=id)
         {
            if(all.length==0)
            {
            	window.location.href = "#/ret/"+($scope.pics[(i==1?0:1)].img.replace("\/","\|"));
            }
            else
            {
            	$scope.pics[i] = all[Math.floor(all.length*Math.random())];
            }
         }
     }

     console.log(all);
  }
}

//图片详情页
function PicCtrl($scope,$routeParams) 
{
  $scope.url = $routeParams.url;
}

//产生结果
function RetCtrl($scope,$routeParams)
{
    $scope.url = $routeParams.url;
    $scope.error = false;

    if($scope.url)
    {
      $scope.url = $scope.url.replace("\|","\/");
    }
    else
    {
      $scope.error = 'No results!';
    }
    
}

