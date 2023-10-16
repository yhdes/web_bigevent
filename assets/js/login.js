$(() => { 
    //点击去注册账号的连接
    $('#link_reg').on('click',function(){
       $('.login-box').hide()
       $('.reg-box').show()
    })
    //点击去登陆账号的连接
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
     }) 

    //  从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    
    //通过form.verify函数自定义校验规则
    // form.verify({
    //  //自定义一个pwd的校验规则
    //     pwd: [/^[\S]{6,12}$/
    //     ,'密码必须6到12位,且不能出现空格']
    //     repwd: function (value){
    //     //通过行参拿到确认密码框中的内容
    //     var pwd = $('.reg-box [name=password]').val()
    //     // 然后进行一次比较
    //     if(pwd !=value){
    //         return '两次输入的密码不一致！'
    //     // 还需要拿到密码框中的内容
        
    //     // 如果判断失败，则return一个错误

    //     }
    //     }

    form.verify({
            //自定义一个pwd的校验规则
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
            //自定义一个reepwd的校验规则
            repwd: function(value) {
                //通过行参拿到确认密码框中的内容
                var pwd = $('.reg-box [name=password]').val()
                if(pwd != value) {
                    return '两次输入的密码不一致！'
                }
            }
        })
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
          username: $('#form_reg [name=username]').val(),
          password: $('#form_reg [name=password]').val()
        }
        //!!!!!!!!!!!!!!!!!!API有问题，不能用了！！！！！
        $.post('/api/reguser', data, function(res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg('注册成功，请登录！')
          // 模拟人的点击行为
        //   $('#link_login').click()
        })
      })
     
      //监听登录表单的提交事件
      $('#form_login').submit(function(e) {
    // 阻止默认提交行为
       e.preventDefault()
       $.ajax({
        url: '/api/login',
         method: 'POST',
      // 快速获取表单中的数据
        data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 有的接口并不是完全开放的，需要有一个token值，将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })


})
