import jwt from 'jsonwebtoken'

const generationToken = (id) => {
    return jwt.sign ( {id}, process.env.JWT_SECRET, {
        expression:"30d",
    })
}


export default generationToken