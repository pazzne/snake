  //画格子
  var size = 25;
  document.writeln("<table cellspacing='0' align='center'>");
  for(var i=0;i<size;i++){
 	  document.writeln("<tr>");
 	  for(var j=0;j<size;j++){
 	  	document.writeln("<td id='x"+j+"y"+i+"' type='map'></td>");
 	}
 	document.writeln("</tr>");
  }
  document.writeln("</table>");

  //创建蛇
  var snake = new Array();
  function createSnake(){
		var x = parseInt(Math.random()*(size-2));
		var y = parseInt(Math.random()*size);
		snake[0] =new Array(x,y);
		$("#x"+x+"y"+y).attr('type','snake');
		$("#x"+x+"y"+y).css("background-color","#ccc");
		for (var i=1;i<=2;i++) {
			x++;
			snake[i] = new Array(x,y);
			$("#x"+x+"y"+y).attr('type','snake');
			$("#x"+x+"y"+y).css("background-color","#ccc");
		}
  }

   //创建食物
  var food = new Array();
  function createFood(){
    var x = parseInt(Math.random()*size);
    var y = parseInt(Math.random()*size);
    while($("#x"+x+"y"+y).attr('type')=="snake"){
      var x = parseInt(Math.random()*size);
      var y = parseInt(Math.random()*size);
    }
    food = new Array(x,y);
    $("#x"+x+"y"+y).attr("type","food");
    $("#x"+x+"y"+y).css({backgroundColor:"red"});
  }
  createFood();

  var islive = false;
  var row = 0;
  var column = 0;
  //死了
  function die(){
     islive = false;
     window.alert("Game over!!!");
     window.location.reload();//刷新页面
  }
  function move(){
    //已经死了
 	  if (!islive) {
 	  	 return;
 	  }
 	  var x = snake[0][0]+row;
 	  var y = snake[0][1]+column;
 	  snake.unshift(new Array(x,y));
 	  var type = $("#x"+x+"y"+y).attr("type");

    //如果蛇头前方的格子是蛇自己
 	  if (type == "snake") {
 	  	die();
 	  }else if (type == "food") {
 	  	$("#x"+x+"y"+y).attr('type','snake');
 	  	$("#x"+x+"y"+y).css({backgroundColor:"#ccc"});
 	  	createFood();
      
      //蛇的长度改变的时候，速度不断改变
      switch(snake.length){
				case 5:
					clearInterval(timer);
					timer = window.setInterval("move()",150);
					break;
				case 7:
					clearInterval(timer);
					timer = window.setInterval("move()",100);
					break;
				case 8:
					clearInterval(timer);
					timer = window.setInterval("move()",80);
					break;
				case 9:
					clearInterval(timer);
					timer = window.setInterval("move()",50);
					break;
      }
    }else if (type == "map") {
       //蛇头前方的格子是普通的白色格子
 	  	 var tmp = snake.pop();
 	  	 $("#x"+tmp[0]+"y"+tmp[1]).attr("type","map");
 	  	 $("#x"+tmp[0]+"y"+tmp[1]).css({backgroundColor:"#fff"});
 	  	 $("#x"+x+"y"+y).attr('type','snake');
 	  	 $("#x"+x+"y"+y).css({backgroundColor:"#ccc"});
 	  }else{
      //蛇头前方的格子既不是蛇也不是普通的白格子，也不是食物，那肯定是到表格的边框了
	  	  die();
 	  }
  }

  var direction = "";//增加一个变量的方向
  var timer = 0;//用于暂停
  $(function(){
   	  createSnake();
   	  createFood();
   	  $(document).keydown(function(e){//有键按下
          var key = e.keyCode;
          switch(key){
          	  case 32://空格键(控制暂停和继续)
            	  if(timer!=0){
            	  	 window.clearInterval(timer);//清理掉计时器
            	  	 timer = 0;
            	  }else{
            	  	 if(islive){
            	  	 	timer = window.setInterval("move()",200);//每隔200毫秒执行一次move函数
            	  	 }
            	  }
            	  return;

              case 37://左
          	  if (direction=="right") {
          	  	 return;
          	  }
          	  row = -1;//向左移动一个格
          	  column = 0;//垂直位置不变
          	  direction = "left";
          	  break;

          	  case 40://上
          	  if (direction == "down") {
          	  	return;
          	  }
          	  row = 0;//水平方向不变
          	  column = 1;//垂直方向向上走一个格
          	  direction = "up";
          	  break;

          	  case 39://右
          	  if (direction =="left") {
          	  	return;
          	  }
          	  row = 1;//向右移动一个格
          	  column = 0;//垂直位置不变
          	  direction = "right";
          	  break;

          	  case 38://下
          	  if (direction == "up") {
          	  	return;
          	  }
          	  row = 0;
          	  column = -1;
          	  direction = "down";
          	  break;
          	  default:
          	  return;
          }
          if (!islive) {
          	  islive = true;
          	  if (row==1&&column==0) {
          	  	 snake.reverse();
          	  }
          	  timer = window.setInterval("move()",200);
          }
   	  });
  });