const notes = [
    {
        id: 1,
        title: "FIRST NOTE",
        body: "this is first note",
        updated: "2022-07-24T23:33:21.923Z"
    },
    {
        id: 2,
        title: "SECOND NOTE",
        body: "this is second note",
        updated: "2022-07-24T23:33:54.138Z"
    },
    {
        id: 3,
        title: "THIRD NOTE",
        body: "this is third note",
        updated: "2022-07-24T23:34:19.666Z"
    }
];

class NotesAPI {
    static getAllNotes() {
        const savedNotes = notes || [];
        //return sorted saved notes list:
        return savedNotes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote() { }
    static deleteNote() { }
}

console.log(NotesAPI.getAllNotes());