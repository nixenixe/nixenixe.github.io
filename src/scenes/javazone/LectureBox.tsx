import * as React from 'react';
import {Lecture} from "./types";
import "./javazone.less";
import moment from "moment";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

export const LectureBox = ({lecture, setFavorites, favorite}: {
    lecture: Lecture,
    setFavorites: (fav: string) => void,
    favorite: boolean
}) => {
    const saveFavorite = () => {
        setFavorites(lecture.id);
        const storage = localStorage.getItem('favorites');
        let favorites: any[] = [];
        if (storage) {
            try {
                const storageObj: string[] = JSON.parse(storage);
                favorites = [...storageObj];
                const index = storageObj.indexOf(lecture.id);
                if (index === -1) {
                    favorites.push(lecture.id);
                } else {
                    favorites.splice(index, 1);
                }
            } catch (_) {
                favorites.push(lecture.id);
            }
        } else {
            favorites.push(lecture.id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    return (
        <div className="lecture-box">
            <div className="info">
                <div className="time">
                    {`${moment(lecture.startTime).format('D. MMM HH:mm')} - ${moment(lecture.endTime).format('HH:mm')}`}
                </div>
                <div>{lecture.title}</div>
                <div className="room">{lecture.room}</div>
            </div>
            <div className="heart-icon">
                {favorite ? <AiFillHeart
                        size={30}
                        onClick={saveFavorite}/> :
                    <AiOutlineHeart
                        onClick={saveFavorite}
                    />}
            </div>
        </div>
    )
}
