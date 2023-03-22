import React, {useEffect, useState} from 'react';
import style from './App.module.scss';
import {SearchPanel} from '../panels/SearchPanel';
import {Notes, NoteType} from '../notes/Notes';
import {AddPanel} from '../panels/AddPanel';

export const NotesContext = React.createContext<NotesContextPropsType>({} as NotesContextPropsType);
export const App: React.FC = () => {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [searchTextValue, setSearchTextValue] = useState('');
    useEffect(() => {
        fetch('../notes.json').then(async (res) => {
            const responseToJSON = await res.json();
            const responseNotes: NoteType[] = responseToJSON.notes;
            setNotes(responseNotes);
        });
    }, []);

    const getHashtagsFromText = (text: string) => text.split(' ').filter(w => w.charAt(0) === '#');

    const addNote = (text: string) => {
        const hashtags = getHashtagsFromText(text);
        setNotes([...notes, {id: notes.length, text, hashtags}]);
        setSearchTextValue('');
    }

    const removeNote = (id: number) => setNotes(notes.filter(n => n.id !== id));
    const updateNote = (values: { id: number, text: string }) => {
        const hashtags = getHashtagsFromText(values.text);
        setNotes(notes.map(n => n.id !== values.id ? n : {...n, text: values.text, hashtags}));
    }

    const changeSearchTextValue = (value: string) => setSearchTextValue(value);

    return (
        <div className={style.app}>
            <SearchPanel searchTextValue={searchTextValue} changeSearchTextValueCallBack={changeSearchTextValue}/>
            <AddPanel addNoteCallBack={addNote}/>
            <NotesContext.Provider
                value={{
                    notes,
                    removeNotesCallBack: removeNote,
                    updateNoteCallBack: updateNote,
                    changeSearchTextValueCallBack: changeSearchTextValue
                }}>
                <Notes
                    notes={!searchTextValue ? [...notes].reverse() : notes.filter(n => n.hashtags.includes(searchTextValue))}
                />
            </NotesContext.Provider>

        </div>
    )
}

interface NotesContextPropsType {
    notes: NoteType[]
    removeNotesCallBack: (id: number) => void
    updateNoteCallBack: (values: { id: number, text: string }) => void
    changeSearchTextValueCallBack: (value: string) => void
}
