class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :name
      # usersテーブルの「user_id」をつける。reference型を使う場合は外部キー（foreign_key: true）制約をつける。
      t.references :user, foreign_key: true
      t.string :goods
      t.string :quantity
      t.string :totalPrice

      t.timestamps
    end
  end
end
