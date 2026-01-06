export default function DeleteConfirmed({ show, onCancel, onConfirm, itemName, item }) {
    if (!show) return null; 

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        <button type="button" className="btn-close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want delete ce {item} <strong>{itemName}</strong>?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}