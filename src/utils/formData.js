/* eslint-disable no-lonely-if */
/* eslint-disable no-useless-return */
/* eslint-disable no-else-return */

const formData = async (data) => {
    const formData = new FormData();

    // exclude property
    const allowNull = ['photo_item'];
    const plainTextField = [];

    Object.keys(data).forEach((fieldName) => {
        if (!data[fieldName] && !allowNull.includes(fieldName)) {
            return;
        } else {
            if (plainTextField.includes(fieldName)) {
                formData.append(fieldName, JSON.stringify(data[fieldName]));
            } else {
                formData.append(fieldName, data[fieldName]);
            }
        }
    });

    return formData;
};

export default formData;
