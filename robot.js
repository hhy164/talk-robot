(function(){
    var main = document.getElementsByClassName('main')[0];

    var init = function(){
        initEvents();
 
    }

    // 事件触发函数
    var initEvents = function(){
        sendBtn.addEventListener('click',onSendBtnClick);

    }
    // 文本框聚焦事件
    input.onfocus = function(){
        this.placeholder="";
    }
    input.onblur = function(){
        this.placeholder = "请在这里输入聊天信息";
    }
    // 按钮点击时间函数
    var onSendBtnClick = function(){
        var txt = input.value.trim();
        if(!txt) return
        // 渲染内容，请求数据
        renderSelfChatInfo(txt);
        
    }
    // 渲染自己的聊天信息
    var renderSelfChatInfo = function(txt){

        // 自己的内容追加到我们的显示区域
        renderHtml(txt,'right');
        //发送数据请求
        input.value = '';
        //发送完数据后需要将输入框清空
        sendChatInfoToBackEnd(txt);//发送聊天信息到后端

    }

    // 发送聊天信息到后端
    var sendChatInfoToBackEnd = function(txt){
        ajax({
            url:'https://api.hyfarsight.com/test/testRequest/robotChat',
            method:'POST',
            data:{txt:txt},
            onSuccess:function(res){
                renderHtml(res.responseTxt,'left');
            }
        })
    }

    // 将内容插入到dom中
    var renderHtml = function(txt,direction){
        var parentDiv = document.createElement('div');
        parentDiv.className = direction=='right'? 'chat-container avatar-container clearfix' : 'chat-container robot-container clearfix';
        var img = document.createElement('img');
        img.src = direction == 'right'? './img/avatar.jpg' : './img/robot.jpg';
        var childDiv = document.createElement('div');
        childDiv.className = 'chat-txt';
        childDiv.innerHTML = txt.replace(/{br}/g,'<br/>');
        parentDiv.appendChild(img);
        parentDiv.appendChild(childDiv);
        main.appendChild(parentDiv);
    }


    init();
})()