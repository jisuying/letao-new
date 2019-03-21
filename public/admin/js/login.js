$(function () {
    var $form = $('#form');
    //表单验证功能
    $form.bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            username: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 3,
                        max: 6,
                        message: '用户名长度必须在3~6之间'
                    },
                    callback : {
                        message : '用户名错误'
                    }
                }
            },
            password: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //长度校验
                    stringLength: {
                        min: 4,
                        max: 12,
                        message: '用户名长度必须在4~12之间'
                    },
                    callback: {
                        message : '密码错误'
                    }
                }
            },
        }

    })
    //表单验证成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('#form').serialize(),
            success: function (info) {
                console.log( info );
                //根据结果更新验证功能
                if (info.error === 1000) {
                    // console.log( '用户名错误' );
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback')
                } else if (info.error === 1001) {
                    // console.log( '密码错误' );
                    $form.data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                }
                if (info.success) {
                    location.href = "index.html";
                }
            }
            
        })
    });

    //点击重置按钮,重置表单(内容和错误信息)
    $('.backReset').on('click', function () {
        //重置表单的方法
        $form.data('bootstrapValidator').resetForm(true);
    })
})