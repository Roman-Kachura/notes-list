import React, {MouseEvent} from 'react';
import style from './Hashtags.module.scss';

export const HashtagButton: React.FC<HashtagButtonPropsType> = ({hashtag, changeSearchTextValueCallBack}) => {
    const clickHandler = (e: MouseEvent<HTMLButtonElement>) => changeSearchTextValueCallBack(e.currentTarget.innerHTML);
    return <button className={style.hashtagButton} onClick={clickHandler}>{hashtag}</button>
}

interface HashtagButtonPropsType {
    hashtag: string
    changeSearchTextValueCallBack: (value: string) => void
}