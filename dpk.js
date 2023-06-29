const crypto = require("crypto");

class deterministicPartitionKey {
  #TRIVIAL_PARTITION_KEY = "0";
  #MAX_PARTITION_KEY_LENGTH = 256;

  constructor(event) {
    this.event = event;
  }

  calculate() {
    if (!this.event) {
      return this.#TRIVIAL_PARTITION_KEY;
    }

    return this.#getValidateKey(this.#getKeyFromEvent(this.event));
  }

  #getCreateHash(data) {
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  #getKeyFromEvent(event) {
    return event.partitionKey || this.#getCreateHash(JSON.stringify(event));
  }

  #getValidateKey(val) {
    const isString = typeof val === "string";
    const isGreaterThanMax =
      String(val).length > this.#MAX_PARTITION_KEY_LENGTH;

    if (isString && !isGreaterThanMax) {
      return val;
    }

    return isGreaterThanMax ? this.#getCreateHash(val) : JSON.stringify(val);
  }

  get MAX_PARTITION_KEY_LENGTH() {
    return this.#MAX_PARTITION_KEY_LENGTH;
  }
}

module.exports = deterministicPartitionKey;
