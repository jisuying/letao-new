$(function () {
    render(1);
    function render(page) {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize:5
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('cate2-tpl',info))
            }

        })
    }
    //添加分类
    $('.insert').on('click', function () {
        $('#cate2Modal').modal('show')
    })
    //表单验证
    //使用表单校验插件
    $("#form").bootstrapValidator({

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    },
                }
            },
            img: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    },
                }
            },
            button: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    },
                }
            },
        },
    })
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
    })

    //清空表单
    $('#cate2Modal').on('hide.bs.modal', function (e) {
        $('#form').data('bootstrapValidator').resetForm(true);
    })

    // 点击下拉菜单,发送请求
    $('.btnChange').on('click', function () {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize:100
            },
            success: function (info) {
                console.log(info);
                $('.ulChange').html(template('li-tpl',info))
            }
        })
    })
    //鼠标点击下拉菜单,更改button的内容
    $('.ulChange').on('click','li', function () {
        var txt = $(this).text();
        $('.btnChange').text(txt)
        //更改状态,为已验证
        $('#form').data('bootstrapValidator').updateStatus('button','VALID')
    })

    //????图片的预览和上传没写


})
