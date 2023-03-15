import { Space, Table } from "antd";
import i18next from "i18next";
import { useEffect, useState } from "react";

const TableTransListComp = ({ children, ...rest }) => {
  const [columns, setColumns] = useState([]);
  const [translateSrc, setTranslateSrc] = useState([]);

  useEffect(() => {
    const resources = Object.keys(i18next.options.resources);
    let cols = [
      {
        title: "Keyword",
        dataIndex: "keyword",
        render: (val) => <b style={{ color: "blue" }}>{val}</b>,
      },
    ];
    let src = {};

    resources.forEach((e) => {
      cols.push({
        title: e,
        dataIndex: e,
        render: (val) => (
          <>{val ?? <b style={{ color: "red" }}>Missing...</b>}</>
        ),
      });
      const trans = i18next.getResourceBundle(e, "translation");
      Object.keys(trans).forEach((k) => {
        if (!src[k]) src[k] = { keyword: k };
        src[k][e] = trans[k];
      });
    });
    setColumns(cols);
    setTranslateSrc(
      Object.keys(src).map((e) => {
        return src[e];
      })
    );
  }, []);

  return (
    <Table
      size="small"
      pagination={false}
      showHeader={true}
      bordered="true"
      rowKey="Keyword"
      // style={{ width: 400, margin: "0 auto" }}
      dataSource={translateSrc}
      columns={columns}
    />
  );
};

const TableEmojiListComp = ({ children, ...rest }) => {
  return (
    <Space wrap style={{ fontSize: 20 }}>
      <span role="img" aria-label="">
        😁🤣😂😅😆😁😊😎😉😜😋🙄😒😔🤔😱👍👌✌👏💪🙏💕💔🔥🤦 ✔ ❤ ▲ ▼ ♂ ♀ ⚤ ✍ ✉
        ⌛ © ® £ € 💲 ∞ 👍 🙏 ✋ 🔊 🎧 🎤 🎁 ☠ ❝ ❞ ° ℃ ℉ π ☀ ☁ ☕ 🔞 ⚠ ♻ 🗘 ⮃ ⮀ ⭤
        ↵ ⮏ ⮌ ⟳ ⟲ ⭯ ⭮ ⟳ ⟲ ∟
      </span>
    </Space>
  );
};

export { TableTransListComp, TableEmojiListComp };
