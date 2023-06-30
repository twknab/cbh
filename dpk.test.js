const DeterministicPartitionKey = require("./dpk");

describe("DeterministicPartitionKey", () => {
  it("Returns the literal '0' when given no event", () => {
    const trivialKey = new DeterministicPartitionKey().calculate();
    expect(trivialKey).toBe("0");
  });

  it("Returns partition key if provided with event", () => {
    const key = new DeterministicPartitionKey({
      partitionKey: "123a456b789c",
    }).calculate();
    expect(key).toBe("123a456b789c");
  });

  it("Returns a generated key if provided with an event without a partition key", () => {
    const key = new DeterministicPartitionKey({
      foo: "bar",
      partitionKey: null,
    }).calculate();
    expect(key).not.toBeNull();
  });

  it("Returns a stringified key if provided with a non-string event partition key", () => {
    const key = new DeterministicPartitionKey({
      partitionKey: 123457890,
    }).calculate();
    expect(typeof key).not.toBe("number");
    expect(key).toBe("123457890");
  });

  it("Returns a newly generated hash key if the event partition key exceeds the maximum length", () => {
    const longString = "A".repeat(dpk.MAX_PARTITION_KEY_LENGTH + 1);
    const key = new DeterministicPartitionKey({
      partitionKey: longString,
    }).calculate();
    expect(longString.length).toBeGreaterThan(dpk.MAX_PARTITION_KEY_LENGTH);
    expect(key).not.toBe(longString);
    expect(key.length).toBeLessThan(dpk.MAX_PARTITION_KEY_LENGTH);
  });
});
