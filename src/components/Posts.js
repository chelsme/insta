import React from 'react';

export default class Posts extends React.Component {
    state = {
        spencepics: ['https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Commune_of_Auray_in_France.jpg/1200px-Commune_of_Auray_in_France.jpg', 'https://www.italiamia.com/wp-content/uploads/2015/11/capri-island.jpg', 'http://www.istockphoto.com/resources/images/PhotoFTLP/img_67920257.jpg', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Llangollen_Church.jpg/1200px-Llangollen_Church.jpg'],
        guypics: ['https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/1/12/0/DV1110_katies-restaurant-cajun-smoked-pork-pizza_s4x3.jpg.rend.hgtvcom.966.725.suffix/1452630157928.jpeg', 'https://food.fnr.sndimg.com/content/dam/images/food/video/0/02/021/0214/0214163.jpg.rend.hgtvcom.616.347.suffix/1481335492935.jpeg', 'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/10/8/0/DV1409H_Guys-Big-Bite-Burger_s4x3.jpg.rend.hgtvcom.966.725.suffix/1383815010599.jpeg', 'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/10/8/1/DV1711H_The-Guidoburger_s4x3.jpg.rend.hgtvcom.966.725.suffix/1383814940488.jpeg']
    }

    componentDidMount() {
        // console.log('Working it!')
    }

    render() {
        return (
            <div id='posts'>
                {this.state.guypics.map((image, index) => {
                    return <p key={index} className='postCard'><img src={image} alt='blurb' /></p>
                })
                }
            </div>
        )
    }
}