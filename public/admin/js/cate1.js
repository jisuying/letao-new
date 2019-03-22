$(function () {
    render(1)
    function render(page) {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize:5
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('cate1-tpl', info))
                pag(info,render)
            }
        })
    }

    //点击添加分类按钮
    $('.insert').on('click', function () {
        $('#cate1Modal').modal('show')
    })
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
        },
    })
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: $('#form').serialize(),
            success: function (info) {
                // console.log( info );
                if (info.success) {
                    $('#cate1Modal').modal('hide')
                    render(1)
                }
            }
        })
    });
        //重置表单
        $('#cate1Modal').on('hide.bs.modal', function () {
            $("#form").data('bootstrapValidator').resetForm();
        })
})
