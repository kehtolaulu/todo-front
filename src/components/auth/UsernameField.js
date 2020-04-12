const UsernameField = ({ value, onChange, error }) => (
    <div className="input-field">
        <input
            type="text"
            placeholder="Username"
            value={value}
            onChange={onChange}
        />
        <div className="error">
            <span className="helper-text" data-error="wrong" data-success="right">{error}</span>
        </div>
    </div>
);

export default UsernameField;
