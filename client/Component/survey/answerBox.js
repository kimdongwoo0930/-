const answerBox = ({ answer }) => {
  return (
    <>
      <input
        type={"checkbox"}
        style={{ width: 100, height: 100, background: "red" }}
      />
      <p>{answer}</p>
    </>
  );
};

export default answerBox;
