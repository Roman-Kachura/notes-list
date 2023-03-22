import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from './Search.module.scss';

export const AddPanel: React.FC<AddPanelPropsType> = ({addNoteCallBack}) => {
    const [value, setValue] = useState('');
    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }
    const keyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value) {
            addNoteCallBack(value);
            setValue('');
        }
        if (e.key === 'Escape') setValue('');
    }
    const clickHandler = () => {
        if (value) {
            addNoteCallBack(value);
            setValue('');
        }
    };
    return (
        <div className={style.panel}>
            <input
                type="text"
                value={value}
                placeholder="Add note"
                onChange={changeHandler}
                onKeyDown={keyPressHandler}
            />
            <button onClick={clickHandler} className={style.addButton}>add</button>
        </div>
    )
}

interface AddPanelPropsType {
    addNoteCallBack: (text: string) => void
}