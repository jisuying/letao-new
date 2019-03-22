$(function () {
    //功能1:点击分类,切换二级菜单的显示和隐藏
    $('.second').prev().on('click', function () {
        $(this).next().toggle();
    })
    //2.点击三横,左侧隐藏,右侧跟随
    $('.ani').on('click', function () {
        $('.lt-aside , .lt-right .right-head, .lt-right').toggleClass('active')
    })
    //3.点击退出,显示模态框
    $('.back').on('click', function () {
        $('#myModal').modal('show');
    })
    //4.点击确定按钮,退出模态框
    $('.submit').on('click', function () {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            success: function (info) {  
                if (info.success) {
                    $('#myModal').modal('hide');
                    location.href = 'login.html';
                }
            }
        })
    })

})