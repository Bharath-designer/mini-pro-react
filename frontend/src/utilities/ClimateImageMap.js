import sunny from "../assets/sunny.webp"
import rainy from "../assets/rainy.svg"
import cloudy from "../assets/cloudy.svg"
import thunder from "../assets/thunder.svg"


export const mapClimateImage = (climate) => {
    switch (climate) {
        case 'Rainy':
            return rainy
        case 'Cloudy':
            return cloudy
        case 'Thunder':
            return thunder
        default:
            return sunny
    }
}