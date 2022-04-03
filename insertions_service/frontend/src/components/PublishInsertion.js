import React from "react";

function PublishInsertion(props) {
    return (
        <div className="container-xl">
            <h1>Insertion</h1>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" name="title" />
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </div>
    );
}

export default PublishInsertion;
