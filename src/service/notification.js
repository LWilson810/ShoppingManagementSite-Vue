import { MessageBox, Message } from 'element-ui';

export const notification = ( msg, type ) => {
    Message({
        message: msg,
        // dangerouslyUseHTMLString: true,
        type: type,
        center: true,
        showClose: true,
        offset: 40,
        duration: 3 * 1000
    })
}