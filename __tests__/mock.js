/**
 * @export
 * @function
 */
export function locationMock() {
  let assignMock = jest.fn();

  afterEach(() => {
    assignMock.mockClear();
  });

  delete window.location;
  window.location = {
    assign: assignMock,
    reload: assignMock,
    replace: assignMock
  };
}