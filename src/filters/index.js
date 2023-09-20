import store from '@/store/index'

export function uppercase(value) {
    return value.toUpperCase();
}

export function autoDeslash(innerText) {
    innerText = innerText.replace('_', " ");
    var textArray = innerText.split(' ');
    var newText = "";
    
    for(var i = 0; i < textArray.length; i++) {
        let midText = "";
        for(var j = 0; j < textArray[i].length; j++) {
            if(j == 0) 
                midText += textArray[i][0].toUpperCase();
            else 
                midText += textArray[i][j];
        }
        if(i == textArray.length -1) {
            newText += midText
        } else {
            newText += midText + " "
        }
    }
    return newText;
}

// export function filterAuthority(value) {
//     // console.log(value, typeof(value));
//     let res = [];
//     const myAuthority = store.state.userInfo.authority;
//     // console.log(myAuthority);
//     if(myAuthority == 'president') {
//         res = value;
//         return res;
//     } else if( myAuthority == 'vice_president') {
//         console.log(value)
//         if (value != 'vice_president') {
//             return value;
//         }
//         // value.map(item => {
//         //     res.push(item);
//         // })
//         // console.log(res);
//         // res = value.filter(item => item.value != 'vice_president');
//         // return res;
//     } else if( myAuthority == 'shopkeeper') {
//         // value.map(item => {
//         //     if(item.value == staff) {
//         //         res.push(item);
//         //     }
//         // })
//         // res = value.filter(item => item.value == 'staff');
//         return res;
//     }
// }