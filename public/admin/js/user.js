$(function () {
    render(1);



    function render(page) {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: page,
                pageSize: 5
            },
            success: function (info) {
                console.log(info);
                $('tbody').html(template('user-tpl', info))
                //渲染分页
                pag(info, render);
            }
        })
    }

    //点击禁用,启用按钮,修改状态
    $('tbody').on('click', '.update button', function () {
        var id = $(this).parent().data('id')
        var isDelete = $(this).hasClass('btn-danger') ? '0' : '1'
        var page = $(this).parent().data('page')
        // console.log( page );
        // console.log( id );
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete  : isDelete
            },
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    render(page)
                }
            }
        })
    })
    
})