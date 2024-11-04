import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import HashMap "mo:base/HashMap";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Option "mo:base/Option";

actor PythonHost {
    private stable var scriptsEntries : [(Text, Text)] = [];
    private var scripts = HashMap.HashMap<Text, Text>(10, Text.equal, Text.hash);

    system func preupgrade() {
        scriptsEntries := Iter.toArray(scripts.entries());
    };

    system func postupgrade() {
        scripts := HashMap.fromIter<Text, Text>(scriptsEntries.vals(), 10, Text.equal, Text.hash);
    };

    public func uploadScript(name: Text, code: Text) : async () {
        scripts.put(name, code);
    };

    public query func getScript(name: Text) : async ?Text {
        scripts.get(name)
    };

    public query func listScripts() : async [Text] {
        Iter.toArray(scripts.keys())
    };
}
