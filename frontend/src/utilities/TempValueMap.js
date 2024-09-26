export const tempValueMap = (tempValue, temp) => {
    if (tempValue === 'C') {
        return `${temp.c}° C`
    } else {
        return  `${temp.f}° F`
    }
}