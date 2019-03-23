$(function () {
    render(1);
    function render(page) {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: 5
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('cate2-tpl', info))
            }

        })
    }
    //添加分类
    $('.insert').on('click', function () {
        $('#cate2Modal').modal('show')
    })



    // 点击下拉菜单,发送请求
    $('.btnChange').on('click', function () {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                // console.log(info);
                $('.ulChange').html(template('li-tpl', info))
            }
        })
    })
    //鼠标点击下拉菜单,更改button的内容
    $('.ulChange').on('click', 'li', function () {
        var txt = $(this).children().text();
        $('.btnChange').text(txt)
        //存储id
        var id = $(this).data('id')
        $('[name="categoryId"]').val(id)
        //更改状态,为已验证
        $("#form").data('bootstrapValidator').updateStatus('categoryId', 'VALID')
    })

    //????图片的预览和上传没写
    $('#fileupload').fileupload({
        done: function (e, data) {

            var url = data.result.picAddr
            $('.form-group img').attr('src', url)
            $('[name="brandLogo"]').val(url)
            $("#form").data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
        }
    })
    //表单验证
    //使用表单校验插件
    $("#form").bootstrapValidator({
        excluded: [],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '二级分类名称不能为空'
                    },
                }
            },
            //校验用户名，对应name表单的name属性
            brandName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '品牌名称不能为空'
                    },
                }
            },
            brandLogo: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    },
                }
            },

        },
    })
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        // console.log($('#form').serialize());
        //校验成功,发送ajax请求
        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: $('#form').serialize(),
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    //隐藏模态框
                    $('#cate2Modal').modal('hide')
                    //重置表单
                    $('.btnChange').text('请选择一级分类')
                    $('.form-group img').attr('src', './images/none.png')
                    //重新渲染
                    render(1)
                }
            }
        })
    })

})
