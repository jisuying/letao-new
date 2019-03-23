$(function () {
    var picArr = []
    render(1)
    function render(page) {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: page,
                pageSize: 5
            },
            success: function (info) {
                $('tbody').html(template('product-tpl', info))
                pag(info, render)
            }
        })
    }

    //显示模态框
    $('.insert').on('click', function () {
        $('#productModal').modal('show')
    })
    //下拉菜单功能
    $('.btnChange').on('click', function () {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                // console.log( info );
                $('.dropdown-menu').html(template('li-tpl', info))
            }

        })
    })
    //下拉菜单点击子菜单
    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text()
        var id = $(this).data('id')
        $('.btnChange').text(txt)
        $('[name="brandId"]').val(id)
        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
    })
    //上传图片
    $('#fileupload').fileupload({
        done: function (e, data) {
            // console.log(data);
            var url = data.result.picAddr
            $('.mul-img').prepend('<img src="' + url + '" width="100" height="100">')
            $('.mul-img img').eq(3).remove()
            picArr.unshift(data.result)
            if (picArr.length === 4) {
                picArr.pop()
                $('#form').data('bootstrapValidator').updateStatus('picArr', 'INVALID')
            }
            if (picArr.length === 3) {
                $('#form').data('bootstrapValidator').updateStatus('picArr', 'VALID')
            }
            $('[name=picArr]').val(JSON.stringify(picArr))
        }
    })
    //表单验证
    $('#form').bootstrapValidator({
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        excluded: [],
        fields: {
            brandId: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '二级分类不能为空'
                    },
                }
            },
            proName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品名称不能为空'
                    },
                }
            },
            proDesc: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品描述不能为空'
                    },
                }
            },
            num: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品库存不能为空'
                    },
                    regexp: {
                        regexp: /^[1,9]\d{0,3}$/,
                        message: '库存数量从1~9999'
                    }
                }
            },
            size: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品尺寸不能为空'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺寸格式写成xx-xx'
                    }
                }
            },
            oldPrice: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品原价不能为空'
                    },
                }
            },
            price: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '商品现价不能为空'
                    },
                }
            },
            picArr: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '图片不能为空'
                    },
                    callback: {
                        message: '图片必须上传3张'
                    }
                }
            }

        }
    })

    //表单成功
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: $('#form').serialize(),
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    //隐藏模态框
                    $('#productModal').modal('hide')
                    //重置表单
                    $('.btnChange').text('请选择二级分类')
                    $('#form').data('bootstrapValidator').resetForm(true)
                    $('.mul-img img').remove()
                    //重新渲染页面
                    render(1)
                }
            }
        })
    })
})