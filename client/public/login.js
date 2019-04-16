$(document).ready(() => {
    $('#regBtn').click(() => {
        $.ajax({
            type: 'GET',
            url: '/register',
            success: (data) => {
                $('#regDiv').html(data);
            },
        });
    });
    $('#loginBtn').click(() => {
        $.ajax({
            type: 'GET',
            url: '/login',
            success: (data) => {
                $('#loginDiv').html(data);
            },
        });
    });
    // =====Login Form Request=============================================
    $('#loginForm').click(() => {
        const uname = $('#uname').val();
        const upass = $('#upass').val();
        const loginData = { name: uname, pass: upass };
        $.ajax({
            type: 'POST',
            url: '/demo',
            data: loginData,
            success: (data) => {
                $('#mainDiv').html(data);
            },
        });
    });
    // =====Register Form=============================================
    $('#regForm').click(() => {
        console.log('Register? or die');
        const uname = $('#uname').val();
        const upass = $('#upass').val();
        const regData = { name: uname, pass: upass };
        $.ajax({
            type: 'POST',
            url: '/regiterToDb',
            data: regData,
            success: (data) => {
                $('#mainDiv').html(data);
            },
        });
    });
    // Save profile Data================================================
    $('#saveBtn').click(() => {
        const email = $('#email').val();
        const phone = $('#phone').val();
        const education = $('#education').val();
        const aoi = $('#aoi').val();
        const name = $('#name').val();
        const pass = $('#pass').val();
        const profileData = {
            email, phone, education, aoi, name, pass,
        };
        $.ajax({
            type: 'POST',
            url: '/completeprofile',
            data: profileData,
            success: (data) => {
                $('#mainDiv').html(data);
            },
        });
    });
});
