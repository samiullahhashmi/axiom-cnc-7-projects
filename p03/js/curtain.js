function open_curtain()
{
    $("#curtain1").animate({width:0},4000);
    $("#curtain2").animate({width:0},4000);
}
function close_curtain()
{
    $("#curtain1").animate({width:300},1000);
    $("#curtain2").animate({width:300},1000);
}